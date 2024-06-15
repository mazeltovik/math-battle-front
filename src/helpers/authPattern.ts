const authPattern = {
  required(v: string) {
    return v.length > 0 || 'This field is required';
  },
  // maxLength(v: string, field: string) {
  //   if (field == 'Email') {
  //     return v.length <= 50 || 'Email should have at most 50 characters';
  //   }
  //   if (field == 'Password') {
  //     if (v) {
  //       return v.length >= 8 || 'Password should have more than 8 characters';
  //     }
  //   }
  // },
  // matchDomainPattern(v: string) {
  //   const regExp =
  //     /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
  //   if (v) {
  //     return regExp.test(v) || 'Email address must have a valid domain address';
  //   }
  // },
  // matchEmailPattern(v: string) {
  //   const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  //   if (v) {
  //     return regExp.test(v) || 'Email address must have a valid address';
  //   }
  // },
  // matchSpacePattern(v: string, field: string) {
  //   const regExp = /\s/g;
  //   if (v) {
  //     return (
  //       !regExp.test(v) || `${field} address must not contain whitespaces `
  //     );
  //   }
  // },
  // matchDogPattern(v: string) {
  //   if (v) {
  //     return v.includes('@') || 'Email address must have "@" symbol';
  //   }
  // },
  // matchLowerCasePattern(v: string) {
  //   const regExp = /[a-z]+/g;
  //   if (v) {
  //     return regExp.test(v) || 'Password should have a-z characters';
  //   }
  // },
  // matchUpperCasePattern(v: string) {
  //   const regExp = /[A-Z]+/g;
  //   if (v) {
  //     return regExp.test(v) || 'Password should have A-Z characters';
  //   }
  // },
  // matchDigitPattern(v: string) {
  //   const regExp = /\d+/g;
  //   if (v) {
  //     return regExp.test(v) || 'Password should have more than one digit';
  //   }
  // },
};

export default authPattern;
