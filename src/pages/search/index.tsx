import FollowRecommendations from '../../components/follow/FollowRecommendations';
import Search from '../../components/search/Search';

export default function SearchPage() {
  return (
    <>
      <Search isHome={false} />
      <FollowRecommendations />
    </>
  );
}
