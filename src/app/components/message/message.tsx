import styles from "./page.module.scss";
import ReactMarkdown from "react-markdown";

type MessageType = {
  role: "user" | "assistant";
  content: string;
};

export default function Message({ role, content }: MessageType) {
  return (
    <div className={styles.messages}>
      <div className={`${styles.message} ${styles[role]}`}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
