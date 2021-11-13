import React from "react";
import Blog from "./Blog/Blog";
import { Container } from "@mui/material";
import "./BlogContainer.css";
import { Typography } from "@mui/material";
const BlogContainer = () => {
  return (
    <Container>
      <section className="blog-section">
        <div className="auto-container">
          {/* <!-- Sec Title --> */}
          <div className="sec-title centered">
            <Typography variant="h4">Our News</Typography>
            <div className="text">
              <Typography variant="p">Our Latest news.</Typography>
            </div>
          </div>

          <div className="row clearfix">
            <Blog
              title="Why Walton Fan Is The Best Choice In Bangladesh?"
              img="https://blog.waltonbd.com/wp-content/uploads/2021/09/Why-Walton-Fan-is-the-Best-choice-in-Bangladesh.jpg"
              desc="Be it summer or spring, a ceiling fan circling over your head makes for the ultimate relaxation."
            />
            <Blog
              title="How Do I Choose An Electric Fan?"
              img="https://blog.waltonbd.com/wp-content/uploads/2021/09/How-do-I-choose-an-electric-fan.jpg"
              desc="If you just searched by typing “How do I choose an Electric Fan?”,
              this article is your perfect guide!...s"
            />
            <Blog
              title="What is Ceiling fan?"
              img="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Ventilatore_a_soffitto_%283%29.png/1200px-Ventilatore_a_soffitto_%283%29.png"
              desc="A ceiling fan is a mechanical fan mounted on the ceiling of a room or space, usually electrically powered, "
            />
          </div>
        </div>
      </section>
    </Container>
  );
};

export default BlogContainer;
