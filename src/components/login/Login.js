import PlainHeaderComponent from "../PlainHeaderComponent";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

class Login extends PlainHeaderComponent {

    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {}
        }
    }

    render() {
        return (
            <section>
                {super.render()}
                <Link to={"/home"}>
                    <Button variant={"info"} className={"m-5"}>Go to Home</Button>
                </Link>
            </section>
        )
    }
}
export default Login
