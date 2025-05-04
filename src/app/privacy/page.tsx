import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-primary">Privacy Policy</h1>

      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Welcome to Travillo's Privacy Policy. Your privacy is critically important to us.
        </p>

        <h2 className="text-2xl font-semibold text-primary pt-4">Information We Collect</h2>
        <p>
          We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, fill out a form, respond to a survey, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number. Users may, however, visit our Site anonymously. We will collect personal identification information from Users only if they voluntarily submit such information to us.
        </p>

        <h2 className="text-2xl font-semibold text-primary pt-4">How We Use Collected Information</h2>
        <p>
          Travillo may collect and use Users personal information for the following purposes:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>To improve customer service: Information you provide helps us respond to your customer service requests and support needs more efficiently.</li>
          <li>To personalize user experience: We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</li>
          <li>To improve our Site: We may use feedback you provide to improve our products and services.</li>
          <li>To process payments: We may use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide the service.</li>
          <li>To run a promotion, contest, survey or other Site feature.</li>
          <li>To send Users information they agreed to receive about topics we think will be of interest to them.</li>
          <li>To send periodic emails: We may use the email address to send User information and updates pertaining to their order. It may also be used to respond to their inquiries, questions, and/or other requests.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary pt-4">How We Protect Your Information</h2>
        <p>
          We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.
        </p>

        <h2 className="text-2xl font-semibold text-primary pt-4">Sharing Your Personal Information</h2>
        <p>
          We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.
        </p>

         <h2 className="text-2xl font-semibold text-primary pt-4">Third-Party Websites</h2>
         <p>
            Users may find advertising or other content on our Site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties (e.g., vehicle rental APIs, hotel booking sites). We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site. In addition, these sites or services, including their content and links, may be constantly changing. These sites and services may have their own privacy policies and customer service policies. Browsing and interaction on any other website, including websites which have a link to our Site, is subject to that website's own terms and policies.
         </p>

        <h2 className="text-2xl font-semibold text-primary pt-4">Changes to This Privacy Policy</h2>
        <p>
          Travillo has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.
        </p>

        <h2 className="text-2xl font-semibold text-primary pt-4">Your Acceptance of These Terms</h2>
        <p>
          By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.
        </p>

        <h2 className="text-2xl font-semibold text-primary pt-4">Contacting Us</h2>
        <p>
          If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at: <a href="mailto:contact@travillo.example.com" className="text-accent hover:underline">contact@travillo.example.com</a>
        </p>

        <p className="text-sm pt-6">
          This document was last updated on {new Date().toLocaleDateString()}.
        </p>
      </div>
    </div>
  );
}
