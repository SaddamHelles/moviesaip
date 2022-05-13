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
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = useCallback(async () => {
    setIsLoading((prevState) => !prevState);
    const response = await CRUDRequests.get(
      "movie/popular?api_key=e4679f16f5d8829f304a692a39f4c9d1"
    );
    setIsLoading((prevState) => !prevState);
    setMoviesList(response.data.results);
    console.log("Response: ", response);
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
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
          {isLoading ? (
            <SpinnerContainer />
          ) : (
            moviesList.map((item) => (
              <Card
                key={item.id}
                id={Math.random() * 200}
                name={item.title}
                img={"https://image.tmdb.org/t/p/w500/" + item.poster_path}
              />
            ))
          )}
        </CardsContainer>
        <LoadMore isLoading={false}>Load more...</LoadMore>
      </InnerSection>
    </FlexColumn>
  );
}

export default HomeScreen;
