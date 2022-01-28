import Batch from "./Batch";
import { BatchProvider } from "context/BatchContext";

export default () => {
  return (
    <BatchProvider>
      <Batch />
    </BatchProvider>
  )
}