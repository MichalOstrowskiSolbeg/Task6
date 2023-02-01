using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.DTO.Requests;
using ServiceLayer.Interfaces;

namespace API.Controllers
{
    public class ExpenseController : ApiControllerBase
    {
        private readonly IExpense _service;
        public ExpenseController(IExpense income)
        {
            _service = income;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUserExpenses(int page)
        {
            return Ok(await _service.GetUserExpenses(GetUserId(), page));
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetExpense(int id)
        {
            try
            {
                return Ok(await _service.GetExpense(id));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostExpense(ExpenseRequest request)
        {
            try
            {
                await _service.AddExpense(request, GetUserId());
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpense(ExpenseRequest request, int id)
        {
            try
            {
                await _service.UpdateExpense(request, id, GetUserId());
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            try
            {
                await _service.DeleteExpense(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
