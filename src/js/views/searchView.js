class SerachView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    const q = this.#parentEl.querySelector('.search__field').value;
    //console.log(q);
    this.#clearInput();
    return q;
  }
  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();

      handler();
    });
  }
}
export default new SerachView();
