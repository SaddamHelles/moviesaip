import {
  FlexColumn,
  FlexRow,
  InnerSection,
  SpinnerContainer,
} from "../../Global.Styles";
import {
  CardsContainer,
  HeroSection,
  InnerHeroSection,
  MoviesTitle,
} from "../HomeScreen/HomeScreen.Styles";
import {
  InfoText,
  MovieDetailsBox,
  MovieImage,
  MovieInfoBox,
  NavigatorContainer,
  NavigatorInnerContainer,
  NavigatorSpan,
  ProgressBar,
  ProgressBarContainer,
  ProgressBarPercentage,
} from "./MovieScreen.Styles";
import ActorCard from "../../Components/ActorCard/ActorCard";
import { useLocation, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import CRUDRequests from "../../API";

function MovieScreen(props) {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const response = await CRUDRequests.get(
      `/movie/${params.id}?api_key=e4679f16f5d8829f304a692a39f4c9d1`
    );
    setMovie((prevState) => response.data);
    setIsLoading(false);
  }, [params.id]);
  console.log("Movie: ", movie);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const location = useLocation();
  console.log(params, location.search);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return isLoading ? (
    <SpinnerContainer />
  ) : (
    <FlexColumn>
      <NavigatorContainer>
        <NavigatorInnerContainer>
          <NavigatorSpan>Back</NavigatorSpan>
          <NavigatorSpan> / {movie.title}</NavigatorSpan>
        </NavigatorInnerContainer>
      </NavigatorContainer>
      <HeroSection
        img={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
      >
        <InnerHeroSection>
          <MovieInfoBox>
            <MovieImage
              src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
              alt={movie.title}
            />
            <MovieDetailsBox>
              <InfoText margin={"0 0 25px"} fontSize={30} fontWeight={700}>
                {movie.title}
              </InfoText>
              <InfoText margin={"0 0 20px"} fontSize={16} fontWeight={700}>
                {movie.tagline}
              </InfoText>
              <InfoText margin={"0 0 20px"} fontSize={16} fontWeight={500}>
                {movie.overview}
              </InfoText>
              <InfoText margin={"0 0 20px"} fontSize={16} fontWeight={700}>
                IMDB RATING
              </InfoText>
              <ProgressBarContainer>
                <ProgressBar>
                  <ProgressBarPercentage width={movie.vote_average * 10} />
                </ProgressBar>
                <InfoText margin={"0 20px"} fontSize={16} fontWeight={500}>
                  {movie.vote_average}
                </InfoText>
              </ProgressBarContainer>{" "}
              <InfoText margin={"0 0 20px"} fontSize={16} fontWeight={700}>
                Tags
              </InfoText>
              <FlexRow>
                {movie.genres.map((item) => (
                  <InfoText
                    key={item.id}
                    margin={"5px 10px"}
                    fontSize={16}
                    fontWeight={500}
                  >
                    {item.name}
                  </InfoText>
                ))}
              </FlexRow>
            </MovieDetailsBox>
          </MovieInfoBox>
        </InnerHeroSection>
      </HeroSection>
      <InnerSection>
        <MoviesTitle>Production Companies</MoviesTitle>
        <CardsContainer>
          {movie.production_companies.map((company) => (
            <ActorCard
              key={company.id}
              id={company.id}
              name={company.name}
              img={"https://image.tmdb.org/t/p/w500/" + company.logo_path}
            />
          ))}
        </CardsContainer>
      </InnerSection>
    </FlexColumn>
  );
}

export default MovieScreen;
