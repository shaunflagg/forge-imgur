import ForgeUI, { render, Fragment, Macro, Text, Image, useProductContext, useState, useEffect } from "@forge/ui";
import { fetch } from '@forge/api';

const IMGUR_API_ENDPOINT = 'https://api.imgur.com/3/gallery/r/earthporn/0';
const CLIENT_ID = process.env.client_id;

const App = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(async () => {
        const fetchData = async () => {
            try {
                const response = await fetch(IMGUR_API_ENDPOINT, {
                    headers: {
                        'Authorization': `Client-ID ${CLIENT_ID}` // Replace with your Client-ID
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                console.log("Received data:", result);  // Log received data
                setData(result.data);
                setLoading(false);
            } catch (err) {
                console.error("Error occurred:", err);  // Log any error
                setError(err);
                setLoading(false);
            }
        };
        await fetchData();
    }, []);

    if (loading) return <Text>Loading images...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <Fragment>
            <Text>Our beautiful Earth from Imgur:</Text>
            {data && data.map(image => (
                <Fragment key={image.id}>
                    <Image src={image.link} alt={image.title} />
                    <Text>{image.title}</Text>
                </Fragment>
            ))}
        </Fragment>
    );
};

export const run = render(
    <Macro
        app={<App />}
    />
);
