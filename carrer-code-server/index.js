const express = require("express");
const app = express();
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-admin-key.json");
require("dotenv").config();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/", (req, res) => {
  res.send("Career Code Server!");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mesbahul01.jvrqgnw.mongodb.net/?appName=Mesbahul01`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const jobsCollection = client.db("CareerCode").collection("jobs");
    const applicationCollection = client.db("CareerCode").collection("applications");

    app.get("/jobs", async (req, res) => {
      const email = req.query.email;
      const query = {};

      if (email) {
        query.hr_email = email;
      }

      const result = await jobsCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/jobs/applications", async (req, res) => {
      const email = req.query.email;
      const query = { hr_email: email };
      const jobs = await jobsCollection.find(query).toArray();

      for (const job of jobs) {
        const applicationQuery = { jobId: job._id.toString() };
        const applicationCount = await applicationCollection.countDocuments(applicationQuery);
        job.applicationCount = applicationCount;
      }

      res.send(jobs);
    });

    app.get("/jobs/:_id", async (req, res) => {
      const result = await jobsCollection.findOne({
        _id: new ObjectId(req.params._id),
      });

      res.send(result);
    });

    app.post("/jobs", async (req, res) => {
      const result = await jobsCollection.insertOne(req.body);
      res.send(result);
    });

    app.post("/applications", async (req, res) => {
      const applicationData = req.body;

      const existingApplication = await applicationCollection.findOne({
        jobId: applicationData.jobId,
        applicant: applicationData.applicant,
      });

      if (existingApplication) {
        return res.status(400).send({ message: "You already applied for this job." });
      }

      const newApplication = {
        ...applicationData,
        applicationStatus: "pending",
        appliedAt: new Date(),
      };

      const result = await applicationCollection.insertOne(newApplication);
      res.send(result);
    });

    app.get("/applications", async (req, res) => {
      const email = req.query.email;
      const query = { applicant: email };
      const applications = await applicationCollection.find(query).toArray();

      for (const application of applications) {
        const job = await jobsCollection.findOne({
          _id: new ObjectId(application.jobId),
        });

        if (job) {
          application.company = job.company;
          application.title = job.title;
          application.location = job.location;
          application.jobStatus = job.status || "active";
          application.salaryRange = job.salaryRange || "";
          application.deadline = job.applicationDeadline || "";
        }
      }

      res.send(applications);
    });

    app.get("/applications/details/:_id", async (req, res) => {
      const id = req.params._id;

      const application = await applicationCollection.findOne({
        _id: new ObjectId(id),
      });

      if (!application) {
        return res.status(404).send({ message: "Application not found" });
      }

      const job = await jobsCollection.findOne({
        _id: new ObjectId(application.jobId),
      });

      res.send({
        ...application,
        jobInfo: job || null,
      });
    });

    // app.get("/applications/job/:_id", async (req, res) => {
    //   const query = {
    //     jobId: req.params._id,
    //   };

    //   const result = await applicationCollection.find(query).toArray();
    //   res.send(result);
    // });

    app.get("/applications/job/:_id", async (req, res) => {
  const jobId = req.params._id;

  const query = { jobId };
  const applications = await applicationCollection.find(query).toArray();

  const job = await jobsCollection.findOne({
    _id: new ObjectId(jobId),
  });

  for (const application of applications) {
    application.jobTitle = job?.title || "Unknown Job";
    application.company = job?.company || "";
  }

  res.send(applications);
});

    app.patch("/applications/:_id", async (req, res) => {
  const id = req.params._id;
  const updatedData = req.body;

  const filter = {
    _id: new ObjectId(id),
  };

  const updatedDoc = {
    $set: {
      applicantName: updatedData.applicantName,
      applicantPhone: updatedData.applicantPhone,
      applicantResume: updatedData.applicantResume,
      coverLetter: updatedData.coverLetter,
    },
  };

  const result = await applicationCollection.updateOne(filter, updatedDoc);
  res.send(result);
});

    app.patch("/applications/status/:_id", async (req, res) => {
      const id = req.params._id;
      const { applicationStatus } = req.body;

      const allowedStatus = ["pending", "accepted", "rejected"];

      if (!allowedStatus.includes(applicationStatus)) {
        return res.status(400).send({ message: "Invalid status value" });
      }

      const filter = {
        _id: new ObjectId(id),
      };

      const updatedDoc = {
        $set: {
          applicationStatus,
        },
      };

      const result = await applicationCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.delete("/applications/:_id", async (req, res) => {
      const id = req.params._id;

      const result = await applicationCollection.deleteOne({
        _id: new ObjectId(id),
      });

      res.send(result);
    });



    app.patch("/jobs/:_id", async (req, res) => {
  const id = req.params._id;
  const updatedData = req.body;

  const filter = { _id: new ObjectId(id) };

  const updatedDoc = {
    $set: {
      title: updatedData.title,
      company: updatedData.company,
      location: updatedData.location,
      jobType: updatedData.jobType,
      category: updatedData.category,
      applicationDeadline: updatedData.applicationDeadline,
      description: updatedData.description,
      requirements: updatedData.requirements,
      responsibilities: updatedData.responsibilities,
      status: updatedData.status,
      salaryRange: updatedData.salaryRange,
    },
  };

  const result = await jobsCollection.updateOne(filter, updatedDoc);
  res.send(result);
});

app.delete("/jobs/:_id", async (req, res) => {
  const id = req.params._id;

  // optional: delete related applications also
  await applicationCollection.deleteMany({ jobId: id });

  const result = await jobsCollection.deleteOne({
    _id: new ObjectId(id),
  });

  res.send(result);
});



  } finally {
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Career Code Server Listening On Port ${port}`);
});