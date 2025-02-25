import { Injectable } from '@angular/core';
import {
  NewsletterTemplate,
  TemplateCategory,
} from '../models/templates.model';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  private categories: TemplateCategory[] = [
    {
      name: 'Holiday',
      templates: [
        {
          name: 'Eid Mubarak Greetings',
          title: 'Eid Mubarak Greetings',
          description: 'Festive holiday layout for Eid updates.',
          subject: 'Eid Mubarak',
          preheader: 'Spread holiday cheer with our news',
          content: `
              <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

      <!-- Header Section -->
      <header style="background-color: #2E8B57; color: #fff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px;">Eid Mubarak! 🌙</h1>
          <p style="margin: 5px 0 0; font-size: 18px;">Wishing you and your family a blessed Eid filled with joy and peace.</p>
      </header>

      <!-- Main Content Section -->
      <main style="padding: 20px; text-align: center;">
          <h2 style="color: #2E8B57; font-size: 24px;">May this Eid bring happiness to your heart and home.</h2>
          <p style="color: #666; font-size: 16px; max-width: 600px; margin: 10px auto;">
              As we celebrate this special occasion, we extend our warmest wishes to you and your loved ones. May Allah bless you with health, happiness, and prosperity.
          </p>

          <!-- Eid Image -->
          <img src="eid-image.jpg" alt="Eid Mubarak" style="width: 100%; max-width: 400px; border-radius: 10px; margin: 20px 0;">

          <!-- Greeting Message -->
          <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin: 20px auto; max-width: 600px;">
              <h3 style="color: #2E8B57; font-size: 22px;">Eid Greetings from Our Family to Yours</h3>
              <p style="color: #666; font-size: 16px;">
                  On this blessed occasion, we pray that Allah accepts your good deeds, forgives your transgressions, and eases the suffering of all people around the globe. Eid Mubarak!
              </p>
          </div>

          <!-- Call-to-Action Button -->
          <a href="#" style="display: inline-block; background-color: #2E8B57; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px; margin: 20px 0;">
              Send Eid Wishes to Loved Ones
          </a>
      </main>

      <!-- Footer Section -->
      <footer style="background-color: #333; color: #fff; text-align: center; padding: 15px; margin-top: 20px;">
          <p style="margin: 0; font-size: 14px;">&copy; 2023 Your Company. All rights reserved.</p>
          <p style="margin: 5px 0 0; font-size: 14px;">Unsubscribe | Privacy Policy</p>
      </footer>

  </body>
            `,
        },
        {
          name: 'New Year Spark',
          title: 'New Year Spark',
          description: 'Bright layout for New Year announcements.',
          subject: 'Happy New Year!',
          preheader: 'Start the year with fresh updates',
          content: `
              <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

      <!-- Header Section -->
      <header style="background-color: #0A2E5A; color: #fff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px;">🎉 Happy New Year! 🎉</h1>
          <p style="margin: 5px 0 0; font-size: 18px;">Wishing you a year filled with joy, success, and new beginnings.</p>
      </header>

      <!-- Main Content Section -->
      <main style="padding: 20px; text-align: center;">
          <h2 style="color: #0A2E5A; font-size: 24px;">Cheers to a Fresh Start!</h2>
          <p style="color: #666; font-size: 16px; max-width: 600px; margin: 10px auto;">
              As we bid farewell to the past year and welcome 2024, we want to thank you for being part of our journey. Here's to new opportunities, growth, and happiness in the coming year!
          </p>

          <!-- New Year Image -->
          <img src="new-year-image.jpg" alt="Happy New Year" style="width: 100%; max-width: 400px; border-radius: 10px; margin: 20px 0;">

          <!-- New Year Message -->
          <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin: 20px auto; max-width: 600px;">
              <h3 style="color: #0A2E5A; font-size: 22px;">Our Wishes for You in 2024</h3>
              <p style="color: #666; font-size: 16px;">
                  May this New Year bring you peace, prosperity, and countless moments of joy. Let’s make 2024 a year to remember!
              </p>
          </div>

          <!-- Call-to-Action Button -->
          <a href="#" style="display: inline-block; background-color: #0A2E5A; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px; margin: 20px 0;">
              Share Your New Year Resolutions
          </a>
      </main>

      <!-- Footer Section -->
      <footer style="background-color: #333; color: #fff; text-align: center; padding: 15px; margin-top: 20px;">
          <p style="margin: 0; font-size: 14px;">&copy; 2023 Your Company. All rights reserved.</p>
          <p style="margin: 5px 0 0; font-size: 14px;">Unsubscribe | Privacy Policy</p>
      </footer>

  </body>
            `,
        },
      ],
    },
    {
      name: 'Fashion',
      templates: [
        {
          name: 'Runway Chic',
          title: 'Runway Chic',
          description: 'Sleek design for fashion brand launches.',
          subject: 'Runway Trends',
          preheader: 'Discover the latest catwalk styles',
          content: `
              <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Fashion Show Invitation</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

      <!-- Header Section -->
      <header style="background-color: #000; color: #fff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px;">✨ Fashion Show 2024 ✨</h1>
          <p style="margin: 5px 0 0; font-size: 18px;">Where Style Meets Innovation</p>
      </header>

      <!-- Main Content Section -->
      <main style="padding: 20px; text-align: center;">
          <h2 style="color: #000; font-size: 24px;">You're Invited!</h2>
          <p style="color: #666; font-size: 16px; max-width: 600px; margin: 10px auto;">
              Join us for an unforgettable evening of glamour, creativity, and the latest trends in fashion. Be the first to witness the future of style!
          </p>

          <!-- Fashion Show Image -->
          <img src="fashion-show.jpg" alt="Fashion Show" style="width: 100%; max-width: 600px; border-radius: 10px; margin: 20px 0;">

          <!-- Event Details -->
          <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin: 20px auto; max-width: 600px;">
              <h3 style="color: #000; font-size: 22px;">Event Details</h3>
              <p style="color: #666; font-size: 16px;">
                  📅 <strong>Date:</strong> January 20, 2024<br>
                  ⏰ <strong>Time:</strong> 7:00 PM - 10:00 PM<br>
                  📍 <strong>Venue:</strong> Grand Ballroom, The Luxe Hotel, New York City<br>
                  👗 <strong>Dress Code:</strong> Black Tie Optional
              </p>
          </div>

          <!-- Highlights Section -->
          <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin: 20px auto; max-width: 600px;">
              <h3 style="color: #000; font-size: 22px;">What to Expect</h3>
              <ul style="text-align: left; color: #666; font-size: 16px; padding-left: 20px;">
                  <li>Exclusive runway shows featuring top designers</li>
                  <li>Live music and entertainment</li>
                  <li>Networking with fashion industry leaders</li>
                  <li>Complimentary cocktails and hors d'oeuvres</li>
              </ul>
          </div>

          <!-- Call-to-Action Button -->
          <a href="#" style="display: inline-block; background-color: #000; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px; margin: 20px 0;">
              Reserve Your Seat Now
          </a>
      </main>

      <!-- Footer Section -->
      <footer style="background-color: #333; color: #fff; text-align: center; padding: 15px; margin-top: 20px;">
          <p style="margin: 0; font-size: 14px;">&copy; 2023 Your Fashion Brand. All rights reserved.</p>
          <p style="margin: 5px 0 0; font-size: 14px;">Unsubscribe | Privacy Policy</p>
      </footer>

  </body>
  </html>
            `,
        },
        {
          name: 'Street Style',
          title: 'Street Style',
          description: 'Urban vibe for casual fashion updates.',
          subject: 'Street Style Highlights',
          preheader: 'Casual meets edgy in our new collection',
          content: `
              <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Fashion Show 2024 - The Ultimate Style Experience</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

      <!-- Header Section -->
      <header style="background-color: #FF6F61; color: #fff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px;">🌟 Fashion Show 2024 🌟</h1>
          <p style="margin: 5px 0 0; font-size: 18px;">Experience the Future of Fashion</p>
      </header>

      <!-- Main Content Section -->
      <main style="padding: 20px; text-align: center;">
          <h2 style="color: #333; font-size: 24px;">Get Ready to Be Amazed!</h2>
          <p style="color: #666; font-size: 16px; max-width: 600px; margin: 10px auto;">
              Join us for an electrifying evening of cutting-edge designs, bold trends, and unforgettable moments. This is fashion like you've never seen before!
          </p>

          <!-- Fashion Show Image -->
          <img src="fashion-show-2.jpg" alt="Fashion Show" style="width: 100%; max-width: 600px; border-radius: 10px; margin: 20px 0;">

          <!-- Event Details -->
          <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin: 20px auto; max-width: 600px;">
              <h3 style="color: #FF6F61; font-size: 22px;">Event Details</h3>
              <p style="color: #666; font-size: 16px;">
                  📅 <strong>Date:</strong> February 10, 2024<br>
                  ⏰ <strong>Time:</strong> 6:00 PM - 9:00 PM<br>
                  📍 <strong>Venue:</strong> Skyline Event Center, Los Angeles<br>
                  👗 <strong>Dress Code:</strong> Chic & Trendy
              </p>
          </div>

          <!-- Highlights Section -->
          <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin: 20px auto; max-width: 600px;">
              <h3 style="color: #FF6F61; font-size: 22px;">Why You Can't Miss This</h3>
              <ul style="text-align: left; color: #666; font-size: 16px; padding-left: 20px;">
                  <li>Exclusive preview of Spring/Summer 2024 collections</li>
                  <li>Live performances by top artists</li>
                  <li>Meet-and-greet with renowned designers</li>
                  <li>Complimentary champagne and gourmet bites</li>
                  <li>Networking with fashion influencers</li>
              </ul>
          </div>

          <!-- Call-to-Action Button -->
          <a href="#" style="display: inline-block; background-color: #FF6F61; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px; margin: 20px 0;">
              Grab Your Tickets Now!
          </a>
      </main>

      <!-- Footer Section -->
      <footer style="background-color: #333; color: #fff; text-align: center; padding: 15px; margin-top: 20px;">
          <p style="margin: 0; font-size: 14px;">&copy; 2023 Your Fashion Brand. All rights reserved.</p>
          <p style="margin: 5px 0 0; font-size: 14px;">Unsubscribe | Privacy Policy</p>
      </footer>

  </body>
  </html>
            `,
        },
      ],
    },
    {
      name: 'Company',
      templates: [
        {
          name: 'Corporate Insight',
          title: 'Corporate Insight',
          description: 'Professional layout for corporate updates.',
          subject: 'Quarterly Update',
          preheader: 'See how our company is growing this quarter',
          content: `
              <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <!-- Header Section -->
    <header style="background-color: #003366; color: #fff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 32px;">Corporate Insight</h1>
        <p style="margin: 5px 0 0; font-size: 18px;">Your Source for Industry Trends and Business Intelligence</p>
    </header>

    <!-- Main Content Section -->
    <main style="padding: 20px; text-align: center;">
        <h2 style="color: #003366; font-size: 24px;">Welcome to the Latest Edition</h2>
        <p style="color: #666; font-size: 16px; max-width: 600px; margin: 10px auto;">
            Stay ahead of the curve with our curated insights, expert analysis, and actionable strategies for the modern business landscape.
        </p>

        <!-- Featured Article Section -->
        <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin: 20px auto; max-width: 600px; text-align: left;">
            <h3 style="color: #003366; font-size: 22px;">Featured Article: The Future of AI in Business</h3>
            <p style="color: #666; font-size: 16px;">
                Artificial Intelligence is transforming industries at an unprecedented pace. Discover how businesses are leveraging AI to drive innovation, efficiency, and growth.
            </p>
            <a href="#" style="display: inline-block; background-color: #003366; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 10px;">Read More</a>
        </div>

        <!-- Industry News Section -->
        <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin: 20px auto; max-width: 600px; text-align: left;">
            <h3 style="color: #003366; font-size: 22px;">Industry News</h3>
            <ul style="color: #666; font-size: 16px; padding-left: 20px;">
                <li>Global markets rebound after a volatile quarter.</li>
                <li>New regulations impact the tech sector.</li>
                <li>Sustainability trends shaping corporate strategies.</li>
            </ul>
            <a href="#" style="display: inline-block; background-color: #003366; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 10px;">Explore More News</a>
        </div>

        <!-- Call-to-Action Section -->
        <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin: 20px auto; max-width: 600px;">
            <h3 style="color: #003366; font-size: 22px;">Join Our Webinar: Leadership in the Digital Age</h3>
            <p style="color: #666; font-size: 16px;">
                Learn from industry leaders about navigating the challenges and opportunities of digital transformation. Reserve your spot today!
            </p>
            <a href="#" style="display: inline-block; background-color: #003366; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px; margin-top: 10px;">Register Now</a>
        </div>
    </main>

    <!-- Footer Section -->
    <footer style="background-color: #333; color: #fff; text-align: center; padding: 15px; margin-top: 20px;">
        <p style="margin: 0; font-size: 14px;">&copy; 2023 Corporate Insight. All rights reserved.</p>
        <p style="margin: 5px 0 0; font-size: 14px;">Unsubscribe | Privacy Policy</p>
    </footer>

</body>
            `,
        },
        {
          name: 'Team Spotlight',
          title: 'Team Spotlight',
          description: 'Highlight employees or teams in a simple layout.',
          subject: 'Meet Our Team',
          preheader: 'Employee highlights and success stories',
          content: `
              <h2>Team Spotlight</h2>
              <p>Learn more about the incredible people behind our success.</p>
              <img src="https://via.placeholder.com/300x200.png?text=Team+Photo" style="max-width:100%;" alt="Team Photo" />
            `,
        },
      ],
    },
    {
      name: 'Sales',
      templates: [
        {
          name: 'Flash Sale',
          title: 'Flash Sale',
          description: 'Eye-catching layout for promotional offers.',
          subject: '48-Hour Flash Sale!',
          preheader: 'Grab your favorites at unbeatable prices',
          content: `
              <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <!-- Header Section -->
    <header style="background-color: #FF4500; color: #fff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 32px;">🚨 Flash Sale Alert! 🚨</h1>
        <p style="margin: 5px 0 0; font-size: 18px;">Huge Discounts for a Limited Time Only!</p>
    </header>

    <!-- Main Content Section -->
    <main style="padding: 20px; text-align: center;">
        <h2 style="color: #333; font-size: 24px;">Don't Miss Out on These Amazing Deals!</h2>
        <p style="color: #666; font-size: 16px; max-width: 600px; margin: 10px auto;">
            Hurry! Our flash sale is live, but it won't last long. Grab your favorites before they're gone!
        </p>

        <!-- Sale Countdown Timer -->
        <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin: 20px auto; max-width: 600px;">
            <h3 style="color: #FF4500; font-size: 22px;">⏳ Sale Ends In:</h3>
            <p style="color: #333; font-size: 28px; font-weight: bold; margin: 10px 0;">
                24:59:59
            </p>
            <p style="color: #666; font-size: 16px;">
                Prices go back up when the timer hits zero!
            </p>
        </div>

        <!-- Featured Products Section -->
        <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin: 20px auto; max-width: 600px;">
            <h3 style="color: #FF4500; font-size: 22px;">Featured Products</h3>
            <div style="display: flex; justify-content: space-around; flex-wrap: wrap; margin-top: 10px;">
                <div style="width: 45%; margin: 10px;">
                    <img src="product1.jpg" alt="Product 1" style="width: 100%; border-radius: 10px;">
                    <p style="color: #333; font-size: 16px; margin: 5px 0;">Product 1</p>
                    <p style="color: #666; font-size: 14px;"><del>$100</del> <strong style="color: #FF4500;">$50</strong></p>
                </div>
                <div style="width: 45%; margin: 10px;">
                    <img src="product2.jpg" alt="Product 2" style="width: 100%; border-radius: 10px;">
                    <p style="color: #333; font-size: 16px; margin: 5px 0;">Product 2</p>
                    <p style="color: #666; font-size: 14px;"><del>$150</del> <strong style="color: #FF4500;">$75</strong></p>
                </div>
            </div>
            <a href="#" style="display: inline-block; background-color: #FF4500; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 10px;">Shop Now</a>
        </div>

        <!-- Call-to-Action Section -->
        <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin: 20px auto; max-width: 600px;">
            <h3 style="color: #FF4500; font-size: 22px;">Why Wait? Save Big Today!</h3>
            <p style="color: #666; font-size: 16px;">
                This flash sale is your chance to grab your favorite products at unbeatable prices. Don't miss out—shop now before it's too late!
            </p>
            <a href="#" style="display: inline-block; background-color: #FF4500; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px; margin-top: 10px;">Shop the Sale</a>
        </div>
    </main>

    <!-- Footer Section -->
    <footer style="background-color: #333; color: #fff; text-align: center; padding: 15px; margin-top: 20px;">
        <p style="margin: 0; font-size: 14px;">&copy; 2023 Your Brand. All rights reserved.</p>
        <p style="margin: 5px 0 0; font-size: 14px;">Unsubscribe | Privacy Policy</p>
    </footer>

</body>
            `,
        },
        {
          name: 'Discount Deals',
          title: 'Discount Deals',
          description: 'Simple layout to highlight multiple deals at once.',
          subject: 'Discount Deals Inside',
          preheader: 'Multiple offers, big savings',
          content: `
              <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <!-- Header Section -->
    <header style="background-color: #4CAF50; color: #fff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 32px;">🎉 Special Discount Deals 🎉</h1>
        <p style="margin: 5px 0 0; font-size: 18px;">Exclusive Offers Just for You!</p>
    </header>

    <!-- Main Content Section -->
    <main style="padding: 20px; text-align: center;">
        <h2 style="color: #333; font-size: 24px;">Unlock Incredible Savings Today!</h2>
        <p style="color: #666; font-size: 16px; max-width: 600px; margin: 10px auto;">
            For a limited time only, enjoy exclusive discounts on our most popular products. Don’t miss out—shop now and save big!
        </p>

        <!-- Discount Banner -->
        <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin: 20px auto; max-width: 600px;">
            <h3 style="color: #4CAF50; font-size: 22px;">🛍️ Up to 50% Off!</h3>
            <p style="color: #666; font-size: 16px;">
                From now until [End Date], enjoy massive discounts on select items. Hurry, these deals won’t last long!
            </p>
        </div>

        <!-- Featured Products Section -->
        <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin: 20px auto; max-width: 600px;">
            <h3 style="color: #4CAF50; font-size: 22px;">Featured Deals</h3>
            <div style="display: flex; justify-content: space-around; flex-wrap: wrap; margin-top: 10px;">
                <div style="width: 45%; margin: 10px;">
                    <img src="product1.jpg" alt="Product 1" style="width: 100%; border-radius: 10px;">
                    <p style="color: #333; font-size: 16px; margin: 5px 0;">Product 1</p>
                    <p style="color: #666; font-size: 14px;"><del>$100</del> <strong style="color: #4CAF50;">$50</strong></p>
                </div>
                <div style="width: 45%; margin: 10px;">
                    <img src="product2.jpg" alt="Product 2" style="width: 100%; border-radius: 10px;">
                    <p style="color: #333; font-size: 16px; margin: 5px 0;">Product 2</p>
                    <p style="color: #666; font-size: 14px;"><del>$150</del> <strong style="color: #4CAF50;">$75</strong></p>
                </div>
            </div>
            <a href="#" style="display: inline-block; background-color: #4CAF50; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 10px;">Shop Now</a>
        </div>

        <!-- Call-to-Action Section -->
        <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 10px; padding: 20px; margin: 20px auto; max-width: 600px;">
            <h3 style="color: #4CAF50; font-size: 22px;">Why Wait? Save Big Today!</h3>
            <p style="color: #666; font-size: 16px;">
                These special discounts are your chance to grab your favorite products at unbeatable prices. Don’t miss out—shop now before the deals are gone!
            </p>
            <a href="#" style="display: inline-block; background-color: #4CAF50; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px; margin-top: 10px;">Shop the Deals</a>
        </div>
    </main>

    <!-- Footer Section -->
    <footer style="background-color: #333; color: #fff; text-align: center; padding: 15px; margin-top: 20px;">
        <p style="margin: 0; font-size: 14px;">&copy; 2023 Your Brand. All rights reserved.</p>
        <p style="margin: 5px 0 0; font-size: 14px;">Unsubscribe | Privacy Policy</p>
    </footer>

</body>
            `,
        },
      ],
    },
    {
      name: 'Event Marketing',
      templates: [
        {
          name: 'Webinar Invite',
          title: 'Webinar Invite',
          description: 'Clean invite layout for digital events.',
          subject: 'Join Our Webinar',
          preheader: 'Don’t miss our upcoming online event',
          content: `
              <h2>Webinar Invite</h2>
              <p>Topic: The Future of Tech Innovations</p>
              <p>Date & Time: August 10, 2:00 PM EST</p>
              <p>Register now to secure your spot!</p>
            `,
        },
        {
          name: 'Conference Teaser',
          title: 'Conference Teaser',
          description: 'Bright layout for in-person conferences or summits.',
          subject: 'Conference Teaser',
          preheader: 'Get early-bird tickets and details here',
          content: `
              <h1>Conference Summit 2023</h1>
              <p>We're excited to announce our annual conference. Expect keynotes, workshops, and more!</p>
              <img src="https://via.placeholder.com/300x150.png?text=Event+Image" alt="Event" style="max-width:100%; margin:10px 0;" />
              <p>Book early for discounted tickets. See you there!</p>
            `,
        },
      ],
    },
  ];

  getCategories(): TemplateCategory[] {
    return this.categories;
  }

  getTemplatesByCategory(categoryName: string): NewsletterTemplate[] {
    const category = this.categories.find((c) => c.name === categoryName);
    return category ? category.templates : [];
  }
}
