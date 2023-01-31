using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Interfaces;

namespace API.Controllers
{
    public class ExpenseCategoryController : ApiControllerBase
    {
        private readonly IExpenseCategory _service;
        public ExpenseCategoryController(IExpenseCategory service)
        {
            _service = service;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetExpenseCategories()
        {
            try
            {
                return Ok(await _service.GetExpenseCategories(GetUserId()));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetExpenseCategory(int id)
        {
            try
            {
                return Ok(await _service.GetExpenseCategory(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostExpenseCategory(string name)
        {
            try
            {
                await _service.AddExpenseCategory(name, GetUserId());
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpenseCategory(int id, string name)
        {
            try
            {
                await _service.EditExpenseCategory(name, GetUserId(), id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpenseCategory(int id)
        {
            try
            {
                await _service.DeleteExpenseCategory(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}