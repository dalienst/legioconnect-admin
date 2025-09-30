import ReactMarkdown from "react-markdown";

export default function Markdown({ children }) {
  return (
    <div className="markdown-container">
      <ReactMarkdown
        components={{
          ul: (props) => <ul className="markdown-list" {...props} />,
          a: (props) => <a className="markdown-link" {...props} />,
          p: (props) => <p className="markdown-paragraph" {...props} />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
