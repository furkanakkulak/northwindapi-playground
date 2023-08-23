const Loading = () => {
  return (
    <div className="bg-light-background dark:bg-dark-background flex justify-center items-center h-full w-full absolute">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 dark:border-dark-text border-light-text"></div>
    </div>
  );
};
export default Loading;
