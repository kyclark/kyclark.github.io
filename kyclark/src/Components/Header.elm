module Components.Header exposing (view)

import Html exposing (Html)
import Html.Attributes exposing (attribute, class, href, src, width)
import Route.Path
import Shared
import View exposing (View)


view :
    { title : String
    , body : List (Html msg)
    }
    -> View msg
view props =
    { title = props.title
    , body =
        [ Html.div [ class "container" ]
            [ Html.nav
                [ class "navbar"
                , attribute "role" "navigation"
                , attribute "aria-label" "main navigation"
                ]
                [ Html.div
                    [ class "navbar-brand" ]
                    [ Html.a
                        [ href "/" ]
                        [ Html.img [ src "/logo.png", width 100 ] [] ]
                    ]
                , Html.div [ class "navbar-menu" ]
                    [ Html.div [ class "navbar-end" ]
                        [ Html.div
                            [ class "navbar-item" ]
                            [ Html.a
                                [ class "button"
                                , Route.Path.href Route.Path.Home_
                                ]
                                [ Html.text "Resume" ]
                            ]
                        , Html.div
                            [ class "navbar-item" ]
                            [ Html.a
                                [ class "button"
                                , Route.Path.href Route.Path.Rust
                                ]
                                [ Html.text "Rust" ]
                            ]
                        , Html.div
                            [ class "navbar-item" ]
                            [ Html.a
                                [ class "button"
                                , Route.Path.href Route.Path.Python
                                ]
                                [ Html.text "Python" ]
                            ]
                        , Html.div
                            [ class "navbar-item" ]
                            [ Html.a
                                [ class "button"
                                , Route.Path.href Route.Path.Elm
                                ]
                                [ Html.text "Elm" ]
                            ]
                        , Html.div
                            [ class "navbar-item" ]
                            [ Html.a
                                [ class "button"
                                , Route.Path.href Route.Path.Perl
                                ]
                                [ Html.text "Perl" ]
                            ]
                        , Html.div
                            [ class "navbar-item" ]
                            [ Html.a
                                [ class "button"
                                , Route.Path.href Route.Path.Books
                                ]
                                [ Html.text "Books" ]
                            ]
                        ]
                    ]
                ]
            ]
        , Html.div
            [ class "page" ]
            [ Html.div
                [ class "box" ]
                props.body
            ]
        ]
    }
