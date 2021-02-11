const ConditionalWrapper = ({ wrapper, condition, children }) =>
  condition ? wrapper(children) : children;

export default ConditionalWrapper;
