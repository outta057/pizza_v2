import qs from "qs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	selectorFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort, { sortList } from "../components/Sort";
import { fetchPizzas, selectorPizzaData } from "../redux/slices/pizzasSlice";

const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { items, status } = useSelector(selectorPizzaData);

	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectorFilter);

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	const getPizzas = async () => {
		const sortBy = sort.sortProperty.replace("-", "");
		const order = sort.sortProperty.includes("-") ? "asc" : "desc";
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const search = searchValue ? `&search=${searchValue}` : "";

		dispatch(
			// @ts-ignore
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				currentPage,
			}),
		);

		window.scrollTo(0, 0);
	};

	// если изменили параметры и был первый рендер
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage]);

	// Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sort =
				sortList.find(obj => obj.sortProperty === params.sortProperty) ||
				sortList[0];

			dispatch(
				setFilters({
					categoryId: Number(params.categoryId),
					currentPage: Number(params.currentPage),
					sort,
				}),
			);
			isSearch.current = true;
		}
	}, []);

	// если был первый рендер, то запрашиваем пиццы
	React.useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			getPizzas();
		}

		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	const pizzas = items.map((obj:any) => (<Link to={`/pizza/${obj.id}`} key = {obj.id} >
	<PizzaBlock  {...obj} /></Link>));

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					value={categoryId}
					onChangeCategory={(index:number) => onChangeCategory(index)}
				/>
				<Sort />
			</div>

			<h2 className="content__title">Все пиццы</h2>

			{status === "error" ? (
				<div className="content__error-info">
					<h2>Произошла ошибка</h2>
					<p>Не удалось получить питсы. Попробуйте повторить попытку позже.</p>
				</div>
			) : (
				<div className="content__items">
					{status === "loading" ? skeletons : pizzas}
				</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
