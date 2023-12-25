import Layout from "./layout.comp";
import Message from "./message.comp";

const ErrorComp = () => {
  return (
    <Layout>
      <Message title="Something went wrong. Visit us later" />
    </Layout>
  )
}

export default ErrorComp;