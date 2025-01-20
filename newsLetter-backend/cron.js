const cron = require("node-cron");
const nodemailer = require("nodemailer");
const Post = require("./models/post.model");
const Subscriber = require("./models/subscriber.model");
require("dotenv").config();

// Create a Nodemailer transporter (update credentials as needed)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true if using 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const startCronJob = () => {
  // Run every minute: checks for posts with status = "scheduled" whose time has passed
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      // console.log(
      //   `[CRON] Checking for scheduled posts at ${now.toISOString()}...`
      // );

      // 1) Find posts with status "scheduled" and scheduledAt <= now
      const postsToSend = await Post.find({
        status: "scheduled",
        scheduledAt: { $lte: now },
      });

      for (const post of postsToSend) {
        console.log(`[CRON] Sending scheduled post: ${post.title}`);

        // 2) Fetch all active subscribers (adjust your query logic if needed)
        const subscribers = await Subscriber.find({ status: "active" });

        // 3) Send email to each subscriber
        for (const sub of subscribers) {
          await transporter.sendMail({
            from: `"Newsletter App" <${process.env.EMAIL_USER}>`,
            to: sub.email,
            subject: post.subject,
            text: `${post.preheader}\n\n${post.content}`,
            html: `
            <p>${post.preheader}</p>
            ${post.content}
          `,
          });
        }

        // 4) Update the post status to "sent"
        post.status = "sent";
        post.sentAt = new Date();
        await post.save();

        console.log(
          `[CRON] Post "${post.title}" sent successfully at ${post.sentAt}`
        );
      }
    } catch (error) {
      console.error("[CRON] Error processing scheduled posts:", error);
    }
  });
  console.log("Cron job started");
};

module.exports = startCronJob;

// const cron = require("node-cron");
// const Post = require("./models/post.model");
// const { sendNowLogic } = require("./helpers/sendLogic"); // or inline

// // Runs every minute
// cron.schedule("* * * * *", async () => {
//   const now = new Date();
//   // Find posts that are scheduled and scheduled time is passed
//   const postsToSend = await Post.find({
//     status: "scheduled",
//     scheduledAt: { $lte: now },
//   });
//   for (const post of postsToSend) {
//     // your sending logic (like postController.sendNow but as a function)
//     await sendNowLogic(post._id);
//   }
// });
