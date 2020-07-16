  prepareStartGame() {
    const { name, email } = this.state;
    const hash = MD5(email).toString();
    createPlayerInLocalStorage(name, `https://www.gravatar.com/avatar/${hash}`);
}