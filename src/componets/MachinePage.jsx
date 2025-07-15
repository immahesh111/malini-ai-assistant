import { useParams } from 'react-router-dom';
import Chatbot from './Chatbot';
import machineData from '../data/machineData';

function MachinePage() {
  const { machineType } = useParams();
  const normalizedType = machineType.toUpperCase();
  const data = machineData[normalizedType];

  if (!data) {
    return <div>Machine not found</div>;
  }

  return <Chatbot data={data} />;
}

export default MachinePage;