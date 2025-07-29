CREATE TABLE user_roles (
  id_user INT NOT NULL,
  id_role INT NOT NULL,
  FOREIGN KEY (id_user) REFERENCES tbl_users(id_user),
  FOREIGN KEY (id_role) REFERENCES tbl_roles(id_role)
);
