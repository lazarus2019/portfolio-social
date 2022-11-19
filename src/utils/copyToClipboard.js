import { toast } from "react-toastify";

const copyToClipboard = (content) => {
  navigator.clipboard.writeText(content);
  toast.success("Link copied to clipboard!");
};

export default copyToClipboard;
