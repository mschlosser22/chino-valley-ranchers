import RecipeVideos from "./RecipeVideos";

/**
 * The Chris Can Cook variant: identical to the standard recipe video list
 * except that it has no downloadable recipe card. Kept as a named component so
 * existing imports in RecipesChris.js keep working.
 */
export default function RecipeVideosChris(props) {
  return <RecipeVideos {...props} showDownloadButton={false} />;
}
