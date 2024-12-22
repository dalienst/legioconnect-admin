"use client";
import Link from "next/link";
import React from "react";

export default function Privacy() {
  return (
    <div className="container py-5 px-4">
      <h1 className="mb-4 text-center">Privacy Policy for LegioConnect</h1>
      <p className="mb-3 text-center text-muted">
        Effective Date: 20th December 2024
      </p>
      <p className="mb-4">
        LegioConnect (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
        committed to protecting your privacy. This Privacy Policy explains how
        we collect, use, disclose, and safeguard your information when you use
        our mobile application (the &quot;App&quot;). Please read this Privacy
        Policy carefully. If you do not agree with the terms of this Privacy
        Policy, please do not use the App.
      </p>

      {/* Section 1 */}
      <h2 className="mb-3">Information We Collect</h2>

      <h5 className="mt-4">1. Information You Provide to Us</h5>
      <ul className="ms-3">
        <li>
          <strong>Account Information:</strong> When you register or update your
          account, we collect information such as your name, email address,
          phone number, and password.
        </li>
        <li>
          <strong>Feedback and Reports:</strong> Any information you provide
          when submitting feedback, bug reports, or contacting customer support.
        </li>
      </ul>

      <h5 className="mt-4">2. Information We Collect Automatically</h5>
      <ul className="ms-3">
        <li>
          <strong>Usage Data:</strong> Information about your interactions with
          the App, including the features you use, the time spent on the App,
          and your preferences.
        </li>
        <li>
          <strong>Device Information:</strong> Details about the device you use
          to access the App, such as your device model, operating system, unique
          device identifiers, and mobile network information.
        </li>
        <li>
          <strong>Location Data:</strong> If you grant permission, we may
          collect your device’s location to provide location-based services.
        </li>
      </ul>

      <h5 className="mt-4">3. Information from Third Parties</h5>
      <p>
        We may receive information about you from third-party services you use
        to sign into the App, such as Google or Apple.
      </p>

      {/* Section 2 */}
      <h2 className="mb-3 mt-4">How We Use Your Information</h2>

      <p>We use the information we collect to:</p>
      <ul className="ms-3">
        <li>Provide, maintain, and improve the App.</li>
        <li>Improve and personalize your experience.</li>
        <li>Respond to your comments, questions, and requests.</li>
        <li>Send you updates, promotional content, and other information.</li>
        <li>Monitor and analyze usage and trends to improve the App.</li>
        <li>
          Ensure compliance with legal obligations and enforce our Terms of
          Service.
        </li>
      </ul>

      {/* Section 3 */}
      <h2 className="mb-3 mt-4">Sharing Your Information</h2>
      <p>We may share your information with:</p>
      <ul className="ms-3">
        <li>
          <strong>Service Providers:</strong> Third parties that perform
          services on our behalf, such as hosting, analytics, or payment
          processing.
        </li>
        <li>
          <strong>Legal Compliance:</strong> Authorities if required to comply
          with legal obligations or protect our rights.
        </li>
        <li>
          <strong>Business Transfers:</strong> In connection with a merger,
          sale, or other transfer of assets.
        </li>
      </ul>
      <p>We do not sell your personal information to third parties.</p>

      {/* Section 4 */}
      <h2 className="mb-3 mt-4">Data Retention</h2>
      <p>
        We retain your personal information only for as long as is necessary for
        the purposes set out in this Privacy Policy. We will delete or anonymize
        your information when it is no longer needed.
      </p>

      {/* Section 5 */}
      <h2 className="mb-3 mt-4">Security of Your Information</h2>
      <p>
        We take reasonable measures to protect your personal information from
        unauthorized access, use, or disclosure. However, no method of
        transmission over the internet or method of electronic storage is 100%
        secure.
      </p>

      {/* Section 6 */}
      <h2 className="mb-3 mt-4">Your Choices</h2>
      <ul className="ms-3">
        <li>
          <strong>Account Information:</strong> You can update or delete your
          account information directly within the App or by contacting us at
          <Link href="mailto:info@legioconnect.com">info@legioconnect.com</Link>
          .
        </li>
        <li>
          <strong>Notifications:</strong> You can opt out of receiving
          promotional notifications by changing your App settings.
        </li>
        <li>
          <strong>Location Data:</strong> You can disable location access via
          your device settings.
        </li>
      </ul>

      {/* Section 7 */}
      <h2 className="mb-3 mt-4">Children&apos;s Privacy</h2>
      <p>
        The App is not intended for children under the age of 13. We do not
        knowingly collect personal information from children under 13. If we
        become aware that a child under 13 has provided us with personal
        information, we will delete it.
      </p>

      {/* Section 8 */}
      <h2 className="mb-3 mt-4">Changes to Our Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page. We
        encourage you to review this Privacy Policy periodically for any
        changes.
      </p>

      {/* Last Section */}
      <h3 className="mt-5 mb-3">Contact Us</h3>
      <p>
        If you have any questions or concerns about this Privacy Policy, please
        contact us at:
      </p>
      <p>
        <strong>Email:</strong>{" "}
        <Link href="mailto:info@legioconnect.com">info@legioconnect.com</Link>
      </p>
    </div>
  );
}
