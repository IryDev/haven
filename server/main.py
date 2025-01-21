def main():
    print("Hello from server!")


def test_match():
    age = 10
    match age:
        case 0 | 1:
            print("You are a baby")
        case 2 | 3:
            print("You are a toddler")
        case 4 | 5:
            print("You are a preschooler")
        case 6 | 7:
            print("You are a primary schooler")
        case 8 | 9:
            print("You are a preteen")
        case 10 | 11:
            print("You are a tween")


if __name__ == "__main__":
    test_match()
