import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ title, img, desc }) => {
  return (
    <div className="news-block col-lg-4 col-md-6 col-sm-12">
      <div
        className="inner-box wow fadeInLeft animated"
        data-wow-delay="0ms"
        data-wow-duration="1500ms"
        style={{
          visibility: "visible",
          animationDuration: "1500ms",
          animationDelay: "0ms",
          animationName: "fadeInLeft",
        }}
      >
        <div className="image">
          <Link to="news-detail.html">
            <img src={img} alt="" />
          </Link>
          <div className="post-date">June 26, 2021</div>
        </div>
        <div className="lower-content">
          <ul className="post-info">
            <li>By: Admin</li>
            <li>
              Category: <span>FAN</span>
            </li>
          </ul>
          <h4>
            <Link to="news-detail.html">{title}</Link>
          </h4>
          <div className="text">{desc}</div>
          <Link to="news-detail.html" className="read-more theme-btn">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
