module Pages.Books exposing (page)

import Components.Header
import Html exposing (Html)
import Html.Attributes exposing (class, href, src, width)
import View exposing (View)


page : View msg
page =
    Components.Header.view
        { title = "Pages.Books"
        , body = [ body ]
        }


body =
    Html.div [ class "content" ]
        [ Html.h1 [ class "title" ] [ Html.text "Books" ]
        , Html.div [ class "columns" ]
            [ Html.div [ class "column" ]
                [ Html.div
                    [ class "card" ]
                    [ Html.div [ class "card-image" ]
                        [ Html.img [ src "/tpp-cover.jpg", width 200 ] [] ]
                    , Html.div [ class "card-content" ]
                        [ Html.a [ href "http://tinypythonprojects.com" ]
                            [ Html.text "Tiny Python Projects" ]
                        , Html.text
                            """
                            (Manning, 2020): An introductory textbook for
                            Python where the user writes short, command-line
                            programs that must satisfy a provided test suite.
                            """
                        , Html.a
                            [ href "https://github.com/kyclark/tiny_python_projects" ]
                            [ Html.text "(GitHub)" ]
                        ]
                    ]
                ]
            , Html.div [ class "column" ]
                [ Html.div
                    [ class "card" ]
                    [ Html.div [ class "card-image" ]
                        [ Html.img [ src "/biofx_python.jpg", width 200 ] [] ]
                    , Html.div [ class "card-content" ]
                        [ Html.a [ href "https://www.oreilly.com/library/view/mastering-python-for/9781098100872/" ]
                            [ Html.text "Mastering Python for Bioinformatics" ]
                        , Html.text
                            """
                            (O'Reilly, 2021): An intermediate text that
                            stresses how to write Python using small functions,
                            tests, and types by creating solutions to problems
                            from the rosalind.info bioinformatics challenges.
                           """
                        , Html.a
                            [ href "https://github.com/kyclark/biofx_python" ]
                            [ Html.text "(GitHub)" ]
                        ]
                    ]
                ]
            , Html.div [ class "column" ]
                [ Html.div
                    [ class "card" ]
                    [ Html.div [ class "card-image" ]
                        [ Html.img [ src "/clr.jpg", width 200 ] [] ]
                    , Html.div [ class "card-content" ]
                        [ Html.a
                            [ href "https://www.oreilly.com/library/view/command-line-rust/9781098109424/" ]
                            [ Html.text "Command-Line Rust" ]
                        , Html.text
                            """
                            (O'Reilly, 2024): A beginner book for Rust where
                            the user reimplements common Unix command-line
                            programs.
                            """
                        , Html.a
                            [ href "https://github.com/kyclark/command-line-rust" ]
                            [ Html.text "(GitHub)" ]
                        ]
                    ]
                ]
            ]
        ]
