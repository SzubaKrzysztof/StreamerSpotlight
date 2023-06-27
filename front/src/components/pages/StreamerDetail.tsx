import { useParams } from 'react-router-dom';

const StreamerDetail: React.FC = () => {
    let { streamerId } = useParams();

    // Użyj teraz streamerId do pobrania danych tego streamera

    return <div>{/* Renderuj tutaj szczegóły streamera */}</div>;
};

export default StreamerDetail;
