module Pages.Python exposing (page)

import Components.Header
import Html exposing (Html)
import Html.Attributes exposing (class, href)
import View exposing (View)


page : View msg
page =
    Components.Header.view
        { title = "Python"
        , body = [ body ]
        }


body =
    Html.div [ class "content" ]
        [ Html.h1 [ class "title" ] [ Html.text "Python" ]
        , Html.ul [ class "ul" ]
            [ Html.li []
                [ Html.a [ href "https://pypi.org/user/kyclark/" ]
                    [ Html.text "PyPi Author Page" ]
                , Html.text
                    """: Contributions to PyP
                    document describing a DNAnexus app
                    """
                ]
            , Html.li []
                [ Html.a
                    [ href "https://github.com/kyclark/biofx_python" ]
                    [ Html.text "Mastering Python for Bioinoformatics" ]
                , Html.text
                    """
                    (O'Reilly, 2021): GitHub repository containing code, data,
                    and tests for example programs from the book
                    """
                ]
            , Html.li []
                [ Html.a [ href "https://github.com/kyclark/tiny_python_projects" ]
                    [ Html.text "Tiny Python Projects" ]
                , Html.text
                    """
                    (Manning, 2020): GitHub repository containing code, data,
                    and tests for example programs from the book
                    """
                ]
            ]
        ]
