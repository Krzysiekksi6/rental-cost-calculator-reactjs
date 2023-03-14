import React, { useEffect, useState } from 'react';
import CarItem from './CarItem';
import Card from '../UI/Card/Card';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import classes from './AvalibleCars.module.css';
const AvalibleCars = () => {
	const [cars, setCars] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState(null);
	useEffect(() => {
		const fetchCars = async () => {
			const response = await fetch(
				'https://food-order-app-55062-default-rtdb.firebaseio.com/cars.json'
			);

			if (!response.ok) {
				throw new Error('Something went wrong, you cannot connect to database...');
			}

			const responseData = await response.json();

			const loadedCars = [];

			for (const key in responseData) {
				loadedCars.push({
					id: key,
					brand: responseData[key].brand,
					model: responseData[key].model,
					img: responseData[key].img,
					basePrice: responseData[key].basePrice,
					avgFuelConsumption: responseData[key].avgFuelConsumption,
					amountOfAvaliable: responseData[key].amountOfAvaliable,
					category: responseData[key].category,
				});
			}

			setCars(loadedCars);
			setIsLoading(false);
		};

		fetchCars().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, []);

	if (isLoading) {
		return (
			<section>
				<LoadingSpinner />
			</section>
		);
	}

	if (httpError) {
		return (
			<section>
				<h3 className={classes['http-error']}>{httpError}</h3>
			</section>
		);
	}

	const carsList = cars.map((item) => (
		<CarItem
			key={item.id}
			id={item.id}
			brand={item.brand}
			model={item.model}
			img={item.img}
			basePrice={+item.basePrice}
			avgFuelConsumption={+item.avgFuelConsumption}
			amountOfAvaliable={+item.amountOfAvaliable}
			category={item.category}
		/>
	));

	return (
		<section className={classes['avalible-cars']}>
			<Card>
				<ul>{carsList}</ul>
			</Card>
		</section>
	);
};

export default AvalibleCars;
