import FollowRecommendations from '../../components/FollowRecommendations';
import Search from '../../components/search/Search';

export default function SearchPage() {
  return (
    <>
      <Search isHome={false} />
      <FollowRecommendations />
    </>
  );
}
