import PlainHeaderComponent from "../PlainHeaderComponent";

class Main extends PlainHeaderComponent {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <section>
                {super.render()}
            </section>
        )
    }
}
export default Main
