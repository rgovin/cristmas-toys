let Error404 = {
  render: async () => {
    let view = /* html */ `
            <section class="section">
                <h1> 404 Error </h1>
            </section>
        `;
    return view;
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  after_render: async () => {},
};
export default Error404;