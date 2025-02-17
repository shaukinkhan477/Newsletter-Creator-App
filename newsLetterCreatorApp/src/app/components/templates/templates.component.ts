import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface NewsletterTemplate {
  name: string;
  title: string;
  previewImg: string;
  description: string;
  subject: string;
  preheader: string;
  content: string;
}

interface TemplateCategory {
  name: string; // e.g. 'Holiday', 'Fashion'...
  templates: NewsletterTemplate[];
}

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
})
export class TemplatesComponent {
  // The categories, each with multiple templates
  categories: TemplateCategory[] = [
    {
      name: 'Holiday',
      templates: [
        {
          name: 'Eid Mubarak Greetings',
          title: 'Eid Mubarak Greetings',
          previewImg: 'assets/eid.png',
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
          previewImg: 'assets/template-previews/newyear.png',
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
          previewImg: 'assets/template-previews/runway.png',
          description: 'Sleek design for fashion brand launches.',
          subject: 'Runway Trends',
          preheader: 'Discover the latest catwalk styles',
          content: `
            <h1 style="font-family:sans-serif;">Runway Trends</h1>
            <p>Step into the new season with our curated looks.</p>
            <img src="https://via.placeholder.com/300x200.png?text=Model+Shoot" alt="Model Shoot" style="max-width:100%; margin:10px 0;" />
            <p>Bright colors, bold prints, and statement pieces await you.</p>
          `,
        },
        {
          name: 'Street Style',
          title: 'Street Style',
          previewImg: 'assets/template-previews/streetstyle.png',
          description: 'Urban vibe for casual fashion updates.',
          subject: 'Street Style Highlights',
          preheader: 'Casual meets edgy in our new collection',
          content: `
            <div style="background-color:#f5f5f5; padding:10px;">
              <h2>Street Style Highlights</h2>
              <p>Explore the city with confidence in our latest drop.</p>
              <img src="https://via.placeholder.com/300x150.png?text=Street+Outfit" alt="Street Outfit" style="max-width:100%; margin:10px 0;" />
              <p>Jackets, sneakers, and layering tips to elevate your look.</p>
            </div>
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
          previewImg: 'assets/template-previews/corporate.png',
          description: 'Professional layout for corporate updates.',
          subject: 'Quarterly Update',
          preheader: 'See how our company is growing this quarter',
          content: `
            <h1>Corporate Insight</h1>
            <p>Stay informed about our latest financials and milestones.</p>
            <ul>
              <li>Revenue growth stats</li>
              <li>Key achievements</li>
              <li>Upcoming projects</li>
            </ul>
          `,
        },
        {
          name: 'Team Spotlight',
          title: 'Team Spotlight',
          previewImg: 'assets/template-previews/teamspotlight.png',
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
          previewImg: 'assets/template-previews/flash.png',
          description: 'Eye-catching layout for promotional offers.',
          subject: '48-Hour Flash Sale!',
          preheader: 'Grab your favorites at unbeatable prices',
          content: `
            <div style="background-color:#ffe0e0; padding:10px;">
              <h1 style="color:#b22222;">FLASH SALE!</h1>
              <p>Don't miss our 48-hour discount spree. Shop now!</p>
            </div>
          `,
        },
        {
          name: 'Discount Deals',
          title: 'Discount Deals',
          previewImg: 'assets/template-previews/discount.png',
          description: 'Simple layout to highlight multiple deals at once.',
          subject: 'Discount Deals Inside',
          preheader: 'Multiple offers, big savings',
          content: `
            <h1>Special Discount Deals</h1>
            <ul>
              <li>Buy one, get one 50% off</li>
              <li>Free shipping on orders over $50</li>
              <li>Loyalty points double this week</li>
            </ul>
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
          previewImg: 'assets/template-previews/webinar.png',
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
          previewImg: 'assets/template-previews/conference.png',
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

  // The currently selected category
  selectedCategory = 'Holiday';

  constructor(private router: Router) {}

  // Return templates of the currently selected category
  get currentTemplates() {
    const cat = this.categories.find((c) => c.name === this.selectedCategory);
    return cat?.templates || [];
  }

  // Change the selected category on navbar click
  selectCategory(categoryName: string) {
    this.selectedCategory = categoryName;
  }

  // Apply the chosen template => navigate to /home with query params
  applyTemplate(tmpl: NewsletterTemplate) {
    this.router.navigate(['/home'], {
      queryParams: {
        title: tmpl.title,
        subject: tmpl.subject,
        preheader: tmpl.preheader,
        content: tmpl.content,
      },
    });
  }
}
