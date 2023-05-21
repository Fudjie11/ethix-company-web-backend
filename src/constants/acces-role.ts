const CRUD = {
  create: true,
  view: true,
  update: true,
  delete: true,
};

export const DEFAULT_ROLE_ACCESS = {
  article: CRUD,
  'article-category': CRUD,
  location: CRUD,
  warehouse: CRUD,
  permission: { view: true },
  user: CRUD,
};