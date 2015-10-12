/**
 * This file is provided by Facebook for testing and evaluation purposes
 * only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

module.exports = {

  init: function() {
    localStorage.clear();
    localStorage.setItem('games', JSON.stringify(
      [
    {
        "id": 1,
        "favorite": "Hou",
        "underdog": "Ind",
        "spread": "Off (0)",
        "isOver": true,
        "winner": "Ind"
    },
    {
        "id": 2,
        "favorite": "Atl",
        "underdog": "Was",
        "spread": "7.5",
        "isOver": true,
        "winner": "Atl"
    },
    {
        "id": 3,
        "favorite": "Cin",
        "underdog": "Sea",
        "spread": "2.5",
        "isOver": true,
        "winner": "Cin"
    },
    {
        "id": 4,
        "favorite": "GB",
        "underdog": "StL",
        "spread": "9.0",
        "isOver": true,
        "winner": "GB"
    },
    {
        "id": 5,
        "favorite": "Buf",
        "underdog": "Ten",
        "spread": "2.5",
        "isOver": true,
        "winner": "Buf"
    },
    {
        "id": 6,
        "favorite": "KC",
        "underdog": "Chi",
        "spread": "9.0",
        "isOver": true,
        "winner": "Chi"
    },
    {
        "id": 7,
        "favorite": "Phi",
        "underdog": "NO",
        "spread": "4.5",
        "isOver": true,
        "winner": "Phi"
    },
    {
        "id": 8,
        "favorite": "TB",
        "underdog": "Jax",
        "spread": "2.5",
        "isOver": true,
        "winner": "TB"
    },
    {
        "id": 9,
        "favorite": "Bal",
        "underdog": "Cle",
        "spread": "6.5",
        "isOver": true,
        "winner": "Cle"
    },
    {
        "id": 10,
        "favorite": "Ari",
        "underdog": "Det",
        "spread": "2.5",
        "isOver": true,
        "winner": "Ari"
    },
    {
        "id": 11,
        "favorite": "NE",
        "underdog": "Dal",
        "spread": "8.5",
        "isOver": true,
        "winner": "NE"
    },
    {
        "id": 12,
        "favorite": "Den",
        "underdog": "Oak",
        "spread": "5.0",
        "isOver": true,
        "winner": "Den"
    },
    {
        "id": 13,
        "favorite": "NYG",
        "underdog": "SF",
        "spread": "7.0",
        "isOver": true,
        "winner": "NYG"
    },
    {
        "id": 14,
        "favorite": "SD",
        "underdog": "Pit",
        "spread": "3.0",
        "isOver": false,
        "winner": null
    }
]
    ));
  }

};