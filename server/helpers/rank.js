const rankResults = (results) => {
  return results.sort((a, b) => {
    // Fallback to 0 if likes or views are not available
    const likesA = a.likes ? a.likes : 0;
    const viewsA = a.views ? a.views : 0;
    const dateA = a.createdAt ? new Date(a.createdAt) : null;
    const nameA = a.title ? a.title.toLowerCase() : "";

    const likesB = b.likes ? b.likes : 0;
    const viewsB = b.views ? b.views : 0;
    const dateB = b.createdAt ? new Date(b.createdAt) : null;
    const nameB = b.title ? b.title.toLowerCase() : "";

    // First: Sort by likes and views combined
    const scoreA = likesA * 0.5 + viewsA * 0.5;
    const scoreB = likesB * 0.5 + viewsB * 0.5;

    if (scoreA !== scoreB) {
      return scoreB - scoreA;
    }

    // Second: Sort by creation date if available
    if (dateA && dateB) {
      return dateB - dateA;
    }
  });
};

export default rankResults;
