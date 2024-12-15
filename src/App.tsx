/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
// import { UserWarning } from './UserWarning';
// import { USER_ID } from './api/todos';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import cn from 'classnames';
import { Errors } from './utils/Errors';

export const App: React.FC = () => {
  // if (!USER_ID) {
  //   return <UserWarning />;
  // }

  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [hasError, setHasError] = React.useState<Errors>(Errors.NoError);

  useEffect(() => {
    setHasError(Errors.NoError);
    const getTodosData = async () => {
      try {
        const response = await getTodos();

        setTodos(response);
      } catch (error) {
        setHasError(Errors.UnableToLoad);
      }
    };

    getTodosData();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <Header />
      <TodoList todos={todos} />
      {/* Hide the list if there are no todos */}
      {/* Hide the footer if there are no todos */}
      {todos.length > 0 && <Footer />}
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { hidden: !hasError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => {
            setHasError(Errors.NoError);
          }}
        />
        {/* show only one message at a time */}
        {hasError}
      </div>
    </div>
  );
};
