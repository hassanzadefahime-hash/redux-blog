import { useAddReactionMutation } from "../../api/apiSlice";

const ReactionButtons = ({ blog }) => {
  const reactionEmoji = {
    thumbsUp: "👍",
    hooray: "🎉",
    heart: "💖",
    rocket: "🚀",
    eyes: "👀",
  };

  const [addReaction, { isLoading }] = useAddReactionMutation();

  const handleReaction = async (name) => {
    const reactionUpdate = {
      ...blog.reactions,
      [name]: Number(blog.reactions[name]) + 1,
    };

    try {
      await addReaction({
        blogId: blog.id,
        reactionData: reactionUpdate,
      }).unwrap();
    } catch (error) {
      console.error("Failed to add reaction:", error);
    }
  };

  return (
    <div className="flex flex-row items-center flex-wrap gap-2">
      {Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
          key={name}
          type="button"
          disabled={isLoading}
          onClick={() => handleReaction(name)}
          className="md:px-2 md:py-1 px-2 py-1 gap-1 rounded-lg bg-gray-200 flex items-center disabled:opacity-50"
        >
          <span>{emoji}</span>

          <span>
            {blog.reactions?.[name] ?? 0}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ReactionButtons;