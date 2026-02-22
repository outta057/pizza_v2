import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [ pizza, setPizza ] = React.useState();

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					`https://69750e05265838bbea969def.mockapi.io/items/` + id );
				setPizza(data);
			} catch (error) {
				alert('ОШИБКА ПРИ ПОЛУЧЕНИИ ПИЦЦЫ')
				navigate('/')
			}
		}

		fetchPizza()
	}, []);

	if(!pizza) {
		return "Загрузка..."
	}

	return (
		<div className="container">
			<img src={pizza.imageUrl} />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} </h4>
		</div>
	);
};

export default FullPizza;
