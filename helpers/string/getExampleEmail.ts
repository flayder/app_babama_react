export function getExampleEmail() {
  return `example@${process.env.NEXT_PUBLIC_PROJECT_NAME?.toLowerCase()}.ru`;
}
