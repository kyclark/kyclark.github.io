module Pages.Elm exposing (page)

import Components.Header
import Html exposing (Html)
import Html.Attributes exposing (class, href)
import View exposing (View)


page : View msg
page =
    Components.Header.view
        { title = "Elm"
        , body = [ body ]
        }


body =
    Html.div [ class "content" ]
        [ Html.h1 [ class "title" ] [ Html.text "Python" ]
        , Html.ul [ class "ul" ]
            [ Html.li []
                [ Html.a
                    [ href "https://mdrepo.org" ]
                    [ Html.text "MDRepo" ]
                , Html.text ": Elm rewrite of React front-end (coming soon, see "
                , Html.a
                    [ href "https://staging.mdrepo.org" ]
                    [ Html.text "staging site" ]
                , Html.text ")"
                ]
            , Html.li []
                [ Html.a
                    [ href "https://github.com/kyclark/dxapp-editor" ]
                    [ Html.text "DNAnexus App Editor" ]
                , Html.text
                    """: A form-based editor to correctly generate a complex JSON
                    document describing a DNAnexus app
                    """
                ]
            , Html.li []
                [ Html.a [ href "https://github.com/kyclark/tiny_elm_projects" ]
                    [ Html.text "Tiny Elm Projects" ]
                , Html.text
                    """: Several Elm project ideas for an instructional Elm 
                    book in the style of Tiny Python Projects
                    """
                ]
            ]
        ]
