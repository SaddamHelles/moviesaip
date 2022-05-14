import {
  FlexColumn,
  InnerSection,
  SpinnerContainer,
} from "../../Global.Styles";
import {
  CardsContainer,
  Description,
  HeroSection,
  InnerHeroSection,
  LoadMore,
  MoviesTitle,
  Title,
} from "./HomeScreen.Styles";
import Card from "../../Components/Card/Card";
import { useCallback, useEffect, useState } from "react";
import CRUDRequests from "../../API";

function HomeScreen(props) {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchData = useCallback(async () => {
    const response = await CRUDRequests.get(
      `/movie/popular?api_key=e4679f16f5d8829f304a692a39f4c9d1&page=${pageNumber}`
    );
    setMoviesList((prevState) => [...prevState, ...response.data.results]);
    setIsLoading(false);
  }, [pageNumber]);

  useEffect(
    () => {
      fetchData();
    },
    [fetchData],
    pageNumber
  );
  const handleLoadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };
  return isLoading ? (
    <SpinnerContainer />
  ) : (
    <FlexColumn>
      <HeroSection
        img={"https://image.tmdb.org/t/p/w500/" + moviesList[0].backdrop_path}
      >
        <InnerHeroSection>
          <Title>{moviesList[0].title}</Title>
          <Description>{moviesList[0].overview}</Description>
        </InnerHeroSection>
      </HeroSection>
      <InnerSection>
        <MoviesTitle>Popular Movies</MoviesTitle>
        <CardsContainer>
          {moviesList.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.title}
              img={"https://image.tmdb.org/t/p/w500/" + item.poster_path}
            />
          ))}
        </CardsContainer>
        <LoadMore onClick={handleLoadMore} isLoading={isLoading}>
          Load more...
        </LoadMore>
      </InnerSection>
    </FlexColumn>
  );
}

export default HomeScreen;
