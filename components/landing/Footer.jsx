import Image from "next/image";
import Link from "next/link";
import React from "react";

const legal = [
  {
    id: 1,
    title: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    id: 2,
    title: "Account Deletion",
    link: "/account",
  },
  {
    id: 3,
    title: "Report a Problem",
    link: "/feedback",
  },
];

const socials = [
  {
    id: 1,
    title: "Email",
    icon: <i className="bi bi-envelope text-white me-2"></i>,
    link: "mailto:admin@legioconnect.com",
  },
  {
    id: 2,
    title: "TikTok",
    icon: <i className="bi bi-tiktok text-white me-2"></i>,
    link: "https://www.tiktok.com/@legioconnect?_t=8s3QcvpG4ak&_r=1",
  },
  {
    id: 3,
    title: "Instagram",
    icon: <i className="bi bi-instagram text-white me-2"></i>,
    link: "https://www.instagram.com/legioconnect?igsh=MW53Mjk5NDlkYTAzaw==",
  },
  {
    id: 4,
    title: "Facebook",
    icon: <i className="bi bi-facebook text-white me-2"></i>,
    link: "https://web.facebook.com/profile.php?id=61570915948671",
  },
];

function Footer() {
  return (
    <footer className="py-5" style={{ backgroundColor: "#4b1719" }}>
      <section className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12 mb-3">
            <h4 className="text-white fw-bold mb-3">LegioConnect Application</h4>
            <p className=" text-justify text-white">
              LegioConnect is an application created for members of Legio Maria
              and those interested in learning more about the faith. It offers
              rich content on Legio Maria’s history, prayers, and the Bible, for
              deeper engagement with the faith.
            </p>
            <Link
              // href="https://play.google.com/apps/testing/com.dalienst.legioconnect"
              href="/early-access"
              target="_blank"
              className="d-inline-flex align-items-center gap-2"
              style={{ width: "auto" }}
            >
              <Image
                src="/preregister.png"
                alt="playstore"
                width={150}
                height={50}
                className="img-fluid"
              />
            </Link>
          </div>

          <div className="col-md-4 col-sm-12 mb-3">
            <h5 className="text-white">Legal</h5>
            <hr />
            <ul className="list-unstyled">
              {legal.map((item) => (
                <li key={item.id} className="list-group-item">
                  <Link
                    href={item.link}
                    target="_blank"
                    className="text-white text-decoration-none"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-4 col-sm-12 mb-3">
            <h5 className="text-white">Socials</h5>
            <hr />
            <ul className="list-unstyled">
              {socials.map((item) => (
                <li key={item.id} className="list-group-item">
                  <Link
                    target="_blank"
                    href={item.link}
                    className="text-white text-decoration-none"
                  >
                    {item.icon} {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
