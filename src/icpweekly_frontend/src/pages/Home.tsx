import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';
import { icpweekly_backend } from '../../../declarations/icpweekly_backend';

const Home = () => {
    const [subscribers, setSubscribers] = useState<number>(0);
    // const [loading, setLoading] = useState(true);    
	const resources = [
		{ title: 'Tweet 1', description: 'Interesting ICP tweet', link: '#' },
		{ title: 'Event', description: 'Upcoming ICP event', link: '#' },
		{ title: 'Resource', description: 'Learn about ICP', link: '#' },
    ];
    useEffect(() => { 
        const fetchResources = async () => {
            const res = await icpweekly_backend.totalSubcribers();
            console.log('res', res);
            setSubscribers(Number(res));
        }
        fetchResources();
    },[]);

	return (
		<main className="flex h-screen flex-col p-8 items-center justify-center">
			<div>
				<Hero />
				<div>
					<h2 className='text-center'>Join {subscribers}</h2>
				</div>
				<div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
					{resources.map((res, index) => (
						<Card key={index} {...res} />
					))}
				</div>
			</div>
		</main>
	);
};

export default Home;
