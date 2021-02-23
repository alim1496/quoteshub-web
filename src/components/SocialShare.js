import React from "react";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const SocialShare = ({ shareUrl }) => (
  <div className="social-share-container">
    <FacebookShareButton url={shareUrl} className="share-btn">
      <FacebookIcon size={24} round />
    </FacebookShareButton>
    <FacebookMessengerShareButton url={shareUrl} className="share-btn">
      <FacebookMessengerIcon size={24} round />
    </FacebookMessengerShareButton>
    <LinkedinShareButton url={shareUrl} className="share-btn">
      <LinkedinIcon size={24} round />
    </LinkedinShareButton>
    <TwitterShareButton url={shareUrl} className="share-btn">
      <TwitterIcon size={24} round />
    </TwitterShareButton>
    <WhatsappShareButton url={shareUrl} className="share-btn">
      <WhatsappIcon size={24} round />
    </WhatsappShareButton>
  </div>
);

export default SocialShare;
