export const getFriendlyAuthError = (error) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Try again or reset it.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was canceled.";
    case "auth/account-exists-with-different-credential":
      return "This email is already linked to another method.";
    default:
      return "Something went wrong. Please try again.";
  }
};
