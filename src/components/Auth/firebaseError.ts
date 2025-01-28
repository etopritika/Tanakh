export const getFirebaseErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/invalid-credential":
      return "Неверный email или пароль.";
    case "auth/email-already-in-use":
      return "Этот email уже используется.";
    case "auth/popup-closed-by-user":
      return "Пользователь закрыл окно авторизации Google.";
    case "auth/cancelled-popup-request":
      return "Предыдущий запрос авторизации отменён.";
    case "auth/too-many-requests":
      return "Слишком много попыток входа. Попробуйте позже.";
    case "auth/user-disabled":
      return "Учётная запись отключена администратором.";
    case "auth/network-request-failed":
      return "Ошибка сети. Проверьте подключение к интернету.";
    case "auth/timeout":
      return "Время ожидания ответа от сервера истекло.";
    case "auth/unverified-email":
      return "Ваш email не подтверждён. Пожалуйста, проверьте почту и подтвердите ваш email.";

    default:
      return "Произошла ошибка. Попробуйте ещё раз.";
  }
};
