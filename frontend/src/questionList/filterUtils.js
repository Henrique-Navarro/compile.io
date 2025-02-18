export const applyFilter = (questions, filters, profile) => {
  const { status, difficulty, category, points } = filters;
  const questionsSolved = profile?.questionsSolved || [];

  let filtered = questions.filter((question) => {
    // Filtro de status
    if (!status || (!status.solved && !status.unsolved)) {
      return true;
    }
    const statusMatch =
      (status.solved && questionsSolved.includes(question.id)) ||
      (status.unsolved && !questionsSolved.includes(question.id));

    return statusMatch;
  });

  filtered = filtered.filter((question) => {
    // Filtro de dificuldade
    if (
      !difficulty ||
      (!difficulty.initial && !difficulty.intermediate && !difficulty.advanced)
    ) {
      return true;
    }
    const difficultyMatch =
      (difficulty.initial && question.level === "INITIAL") ||
      (difficulty.intermediate && question.level === "INTERMEDIATE") ||
      (difficulty.advanced && question.level === "ADVANCED");

    return difficultyMatch;
  });

  filtered = filtered.filter((question) => {
    // Filtro de categoria
    if (!category || Object.values(category).every((value) => !value)) {
      return true;
    }
    const categoryMatch = category[question.category];

    return categoryMatch;
  });

  filtered = filtered.filter((question) => {
    // Filtro de pontos
    if (!points || Object.values(points).every((value) => !value)) {
      return true;
    }
    const pointsMatch =
      (points.five && question.points === 5) ||
      (points.ten && question.points === 10) ||
      (points.fifteen && question.points === 15);

    return pointsMatch;
  });

  return filtered;
};
